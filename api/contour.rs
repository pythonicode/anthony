use http::{StatusCode};
use vercel_lambda::{lambda, error::VercelError, IntoResponse, Request, Response};
use std::error::Error;
use image::{GrayImage, Luma, EncodableLayout};

struct Periodic;

impl Periodic {
	fn first_periodic(input: u8) -> u8 {
		let input: f64 = input as f64;
		let factor: f64 = 15.806015625;
		return ((100.0 / 3.0) * (input as f64 / factor).sin() + 0.4 * (1.3 * input / factor).sin() + 0.1 * (4.0 * input / factor).sin() + 50.0) as u8;
	}
}

fn handler(_: Request) -> Result<impl IntoResponse, VercelError> {
	const WIDTH: usize = 300; const HEIGHT: usize = 300;

	let mut state = [[0u8; HEIGHT]; WIDTH];
	let mut buffer = GrayImage::new(WIDTH as u32, HEIGHT as u32);

	for x in 0..WIDTH {
		for y in 0..HEIGHT {
			state[x][y] += Periodic::first_periodic(27 * y as u8) / 4;
			state[x][y] += Periodic::first_periodic(13 * x as u8 + 26 * y as u8) / 4;
			state[x][y] += Periodic::first_periodic(11 * x as u8 + 4 * y as u8) / 4;
			state[x][y] += Periodic::first_periodic(14 * x as u8 + 3 * y as u8) / 4;
			let pixel = buffer.get_pixel(x as u32, y as u32);
			*pixel = image::Luma([state[x][y]]);
		}
	}

	let data = buffer.as_bytes();

	let response = Response::builder()
	.status(StatusCode::OK)
	.header("Content-Type", "image/jpeg")
	.body(&data)
	.expect("Internal Server Error");
	
	Ok(response)
}

// Start the runtime with the handler
fn main() -> Result<(), Box<dyn Error>> {
	Ok(lambda!(handler))
}