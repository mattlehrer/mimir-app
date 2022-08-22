# Mimir App

An automated to do list for your digital marketing from your web analytics.

## TODO

- [x] Setup auth with Supabase
- [x] Setup oauth with Google
- [x] Allow linking multiple Google Analytics accounts
- [x] Update SvelteKit to directory-based router (408+)
- [x] Handle errors on sign up
- [x] Handle errors on sign in
- [x] Setup RLS on Supabase
- [x] Expose and store GA viewids
- [x] Remove session store, update to newest sveltekit
- [x] Add chosen views to sidebar / nav
- [ ] Make a list of metrics and dimensions to include
  - [x] just starting with bounce rate
- [ ] Create report generator page
- [ ] Create report view
- [ ] Create view pages - what reports are active for each view; if any reports are active, what are the results
- [ ] Integrate report views with CMS for copy that does not need full redeploy
- [ ] Create settings page: what Google accounts are linked (note any that do not have GA accounts), set name, change email, what else?
- [ ] Update to supabase-js v2 https://supabase.com/blog/supabase-js-v2
- [ ] Use progressive enhancement on signup/signin forms (wait for sveltekit form changes)

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
