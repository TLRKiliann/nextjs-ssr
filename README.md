# nextjs-ssr

Crash course about SSR of NextJS.

I voluntarily didn't use the anonymous arrow functions that can cause the fast refresh to not preserve the state 
of local components.

## Server Side Rendering

The power of NextJS is SSR (Server Side Rendering).
Improve SEO by having all the code of appication in one page.

To improve performances by having all the code in one page and by preloading before hydration.
React don't preload all the code of application. At first, the id="root" is loaded by url and after that the page is displayed.

- pre-rendering

HTML is generated at built time.

All the HTML content is generated in advance when we build application.

Production :
------------

delete .next or nodes_modules

`yarn build`

`pnpm run build`

new `.next` is generated

We can read that into the console.

page | size | first load js

At first load, JS shares all the routes and heading into the browser client.

Example :

```
/ => index.tsx (static generation)
.next/server/pages/index.html
```

- `_app.tsx` => grap every page of the application.

- `users` => users.tsx & `_app.tsx` the sum is 64KB.

- SSG - Static Side Generation + automatically genereted as static HTML + JSON

(use getStaticProps)
.next/server/pages/users.html

chunks are downloaded when we use `/users`.
.next/server/static/chunks/pages
Files JS are sended to the browser.

les links sont pre-fetched par default for pages using static generation.

- preloading
- hydratation
- production mode (build)

## Control flow in SSR

- pages
- index.tsx
- getStaticProps
- pages/_app.tsx
- data
- fetch
- props

- `_app.tsx` with getStaticProps generate all files in HTML and JSON to the `.next/server/pages/`

## GetStaticProps

- have to be into pages folder of the app & not into the components folder.

- run only on server side (code server side).

- the code inside this function will be never includes into the bundle JS which is sended to the browser.

- APIkey is not required.

- have the particularity to have an object which one content an object

is pre-rendered at build time
NextJS generates a JSON file holding the result of running getStaticProps()

(This JSON file will be used in client-side routing through next/link or next/router.)

The page must be pre-rendered (indexed ranking SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performances.

getStaticProps does not have access to the incoming request (such as query parameters or HTTP headers) as it generates static HTML. If you need access to the request for your page, consider using Middleware in addition to getStaticProps.

## getStaticPaths()

If a page has Dynamic Routes and uses getStaticProps, it needs to define a list of paths to be statically generated.

- getStaticPaths will only run during build in production, it will not be called during runtime. You can validate code written inside getStaticPaths is removed from the client-side bundle (read official documentation of NextJS).

- getStaticProps runs during next build for any paths returned during build
- getStaticProps runs in the background when using fallback: true
- getStaticProps is called before initial render when using fallback: blocking

## ISR = Incremental Static Generation

allows you to update static pages after you've build app.

When using Incremental Static Generation, getStaticProps will be executed in the background to generate the JSON needed for client-side navigation.

Solution
revalidate: 10

getStaticProps() et un 

console.log("generate / re-generate")


## fallback

- false
- true
- 'blocking'

## SSR - CSR :

As getStaticProps runs only on the server-side, it will never run on the client-side. It won’t even be included in the JS bundle for the browser, so you can write direct database queries without them being sent to browsers.

This means that instead of fetching an API route from getStaticProps (that itself fetches data from an external source), you can write the server-side code directly in getStaticProps.

## GetServerSideProps



## ISR - Incremental Static Rendering

## re-generation

`re-generation` initiated only if a user makes a request after the revalidate time. If another user visit the page details & no other user hitting that page the entire day, `re-generation` does not happen.

