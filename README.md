# nextjs-ssr

Crash course about NextJS.

I voluntarily didn't use the anonymous arrow functions that can cause the fast refresh to not preserve the state of local components.

---

**Roles of NextJS**

- static generation

- Server Side Rendering (SSR)

## Server Side Rendering (SSR)

The power of NextJS is SSR (Server Side Rendering).
Improve SEO by having all the code of appication in one page.

To improve performances by having all the code in one page and by preloading before hydration.
React don't preload all the code of application. At first, the id="root" is loaded by url and after that the page is displayed.

- pre-rendering

HTML is generated at built time.

All the HTML content is generated in advance when we build application.

## Development => Production :

At first, delete the folder .next (generated with yarn) or nodes_modules (generated with npm or pnpm)

`yarn build`

or

`npm run build`

or

`pnpm run build`

New `.next` or `node_modules` is generated into your app.

For every change, you need to delete `.next` or `node_modules` and re-run the cmd diplayed above to build again your application.
You have to do that in static generation case, not in ISR (see below).

When the application is built, we can read into the console `page | size | first load js`. It means that the routes have been built by generating static files into `.next/server/pages/index.html`

page | size | first load js

At first load, JS shares all the routes and heading into the browser client.

Example of static generation :

```
the `/` => corresponds to the index.tsx which is generated in `.next/server/pages/index.html`
```

- `_app.tsx` => grap every page of the application => 0KB.

- `users` => `users.tsx` & `_app.tsx` the sum is equal to 64KB.

- Static Side Generation (SSG) + automatically genereted as static HTML + JSON

Example: users.tsx => .next/server/pages/users.html

chunks are downloaded when we use `/users`.
.next/server/static/chunks/pages
Files JS or TSX are sended to the browser.

Links are pre-fetched by default for pages using static generation (SSG).

- preloading
- hydratation
- production mode (build)

## Control flow in SSR

- pages
- index.tsx
- getStaticProps
- data
- fetch
- props
- `pages/_app.tsx`
- `_app.tsx` with `getStaticProps` function generate all files in HTML and JSON to the `.next/server/pages/`

## GetStaticProps

- Must be in the `pages` folder and not in the `components` folder.

- Run only on server side (code server side).

- The code inside this function will be never includes into the bundle JS or TSX which is sended to the browser.

- APIkey is not required.

- particularity: have an object which one content another object.

```
export async function getStaticProps() {

	const response = await fetch("...")
	const data = await response.json()
	
	return { 			// => object
		props: {		// => second object
			posts: data
	}
}
```

- getStaticProps function generates HTML and JSON files, both of which can be cached by a CDN for performances.

- The pre-rendered is done at build time.

- NextJS generates a JSON file holding the result of running getStaticProps()

- This JSON file will be used in client-side routing through next/link or next/router.

- The page must be pre-rendered and indexed (SEO) and be very fast.

- getStaticProps function does not have access to the incoming request (such as query parameters or HTTP headers) as it generates static HTML. If you need access to the request for your page, consider using Middleware in addition to getStaticProps.

## getStaticPaths()

If a page has Dynamic Routes and uses getStaticProps, it needs to define a list of paths to be statically generated (SSG).

- getStaticPaths will only run during build in production, it will not be called during runtime. You can validate code written inside getStaticPaths is removed from the client-side bundle (read official documentation of NextJS).

- getStaticProps runs during next build for any paths returned during build
- getStaticProps runs in the background when using fallback: true
- getStaticProps is called before initial render when using fallback: blocking

## fallback with static paths (getStaticPaths) ##

**fallback false**

The paths returned from `getStaticPaths` function will be rendered to HTML at built time by `getStaticProps`.
We can verify that in .next/server/pages/post/(num) (here we can see all the paths)

Any Paths not returned by getStaticProps will result in a 404 page http://localhost:3000/post/4 that not beeing created display 404 page.

We should use false:

- For a blog site with a few articles.
- When new page are not added often.
- Application with a small number of paths to pre-render.

Example with getStaticPaths() :

```
([postId].tsx)

export async function getStaticPaths() {

    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await response.json()

    const paths = data.map((post: PostProps) => {
        return {
            params: {
                postId: `${post.id}`,
            }
        }
    })

    return {
        paths: [
            {
                params: {postId: "1"},
            },
            {
                params: {postId: "2"},
            },
            {
                params: {postId: "3"},
            },
    ], fallback: false,
    }
}
```

If we use `http://localhost:3000/posts/4` with the browser, a 404 page will be generated.

---

**fallback true**

The paths returned from getStaticPaths will be rendered to HTML at built time by getStaticProps.

The paths that have not been generated at build time will not result in a 404 page. Instead,
NextJS will serve a "fallback" version of the page on the first request to such a path.

In the background, NextJS will statically generate the requested path HTML and JSON. This includes running getStaticProps.

When that done the browser receives the JSON for the generated path. This will be used to automatically render the page with the required props. From the user's perspective, the page will be swapped from the fallback page to the full page.

At the same time, NextJS keeps track of the new list of pre-rendered pages.Subsequent requests to the same path will serve the generated page, just like other pages pre-rendered at build time.

We should use true:

- Large e-commerce site.
- If you get a few thousand product, build can take a really long time (1s per page).

Example with getStaticPaths() :

```
([postId].tsx)

import { useRouter } from 'next/router'

type SubProps = {
    id: number
    title: string
    posts: any
}

type PostProps = {
    post: SubProps
    id: number
}

function Post({ post }: PostProps) {

	const router = useRouter()

	if (router.isFallback) {
		return <h1>Loading...</h1>		//page display Loading...
	}
    
    return (
        <div key={post.id}>
            <p>{post.id} {post.title}</p>
        </div>
    )
}
export default Post

export async function getStaticPaths() {

    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await response.json()

    const paths = data.map((post: PostProps) => {
        return {
            params: {
                postId: `${post.id}`,
            }
        }
    })

    return {
        paths: [
            {
                params: {postId: "1"},
            },
            {
                params: {postId: "2"},
            },
            {
                params: {postId: "3"},
            },
    ], fallback: true,
    }
}
```

If we use `http://localhost:3000/posts/4` with the browser, a page display `Loading...` before to reach the page expected.

---

**fallback 'blocking'**

(Similar to fallback: true)

The paths returned from getStaticPaths will be rendered to HTML at built time by getStaticProps.

The paths that have not been generated at build time will not result in a 404 page. Instead,
on the first request, NextJS will render the page on the server and return the generated HTML.

When that done the browser receives the HTML for the generated path. There is no flash of loading/fallback state.

At the same time, NextJS keeps track of the new list of pre-rendered pages. Subsequent requests to the same path will serve the generated page, just like other pages pre-rendered at build time.

We should use 'blocking':

- Dev prefer the page to be load without a loading indicator. This helps avoid the layout shift.
- Some crawlers did not support JavaScript. The loading page would be rendered and then the full page would be loaded which was causing a problem.


## Incremental Static Regeneration (ISR)

There was need to update only those pages which needed a change without having
to rebuild entire app.

Allows you to update static pages after you've built your application.

When using Incremental Static Regeneration, getStaticProps will be executed in the background to generate the JSON needed for client-side navigation.

You can statically generate individual pages without needing to rebuild the entire site, effectively solving the issue of dealing with stale data. 

In getStaticProps function, apart from the props key, we can specify a `revalidate key`.

The value for revalidate is the number of seconds after which a page re-generation can occur.


Solution

revalidate: 10

getStaticProps() et un console.log("generate / re-generate")


## re-generation

`re-generation` initiated only if a user makes a request after the revalidate time. If another user visit the page details & no other user hitting that page the entire day, `re-generation` does not happen.

## SSR - CSR :

As getStaticProps runs only on the server-side, it will never run on the client-side. It won’t even be included in the JS bundle for the browser, so you can write direct database queries without them being sent to browsers.

This means that instead of fetching an API route from getStaticProps (that itself fetches data from an external source), you can write the server-side code directly in getStaticProps.

## getServerSideProps

## getClientSideProps