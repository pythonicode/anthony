use http::{StatusCode};
use vercel_lambda::{lambda, error::VercelError, IntoResponse, Request, Response};
use std::{error::Error, io::Cursor};
use image::{RgbImage, EncodableLayout};

struct Periodic;

impl Periodic {
	fn first_periodic(input: f64) -> u8 {
		let input: f64 = input as f64;
		let factor: f64 = 15.806015625;
		return ((100.0 / 3.0) * (input as f64 / factor).sin() + 0.4 * (1.3 * input / factor).sin() + 0.1 * (4.0 * input / factor).sin() + 50.0) as u8;
	}
}

fn handler(_: Request) -> Result<impl IntoResponse, VercelError> {
	const WIDTH: usize = 300; const HEIGHT: usize = 300;

	let mut state = [[0u8; HEIGHT]; WIDTH];
	let mut buffer = RgbImage::new(WIDTH as u32, HEIGHT as u32);

	for x in 0..WIDTH {
		for y in 0..HEIGHT {
			state[x][y] += Periodic::first_periodic(y as f64) / 4;
			state[x][y] += Periodic::first_periodic(0.5 * x as f64 + 0.7 * y as f64 + 144.0) / 4;
			state[x][y] += Periodic::first_periodic(-0.7 * x as f64 + 0.3 * y as f64 + 27.0) / 4;
			// state[x][y] += Periodic::first_periodic(14 * x as u8 + 3 * y as u8) / 4;
			let pixel = buffer.get_pixel_mut(x as u32, y as u32);
			*pixel = image::Rgb([state[x][y], state[x][y], state[x][y]]);
		}
	}

	let image = image::DynamicImage::ImageRgb8(buffer);
	let mut buf = Cursor::new(Vec::new());
	let _result = image.write_to(&mut buf, image::ImageOutputFormat::Png);

	let response = Response::builder()
	.status(StatusCode::OK)
	.header("Content-Type", "image/png")
	.body(buf.into_inner())
	.expect("Internal Server Error");
	
	Ok(response)
}

// Start the runtime with the handler
fn main() -> Result<(), Box<dyn Error>> {
	Ok(lambda!(handler))
}