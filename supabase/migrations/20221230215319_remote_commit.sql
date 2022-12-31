alter table "public"."posts" add column "published" boolean not null default false;

alter table "public"."posts" add column "slug" text default ''::text;

CREATE UNIQUE INDEX posts_slug_key ON public.posts USING btree (slug);

alter table "public"."posts" add constraint "posts_slug_key" UNIQUE using index "posts_slug_key";


