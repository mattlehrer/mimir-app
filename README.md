# Mimir App

An automated to do list for your digital marketing from your web analytics.

## TODO

- [x] Setup auth with Supabase
- [x] Setup oauth with Google
- [x] Allow linking multiple Google Analytics accounts
- [x] Update SvelteKit to directory-based router (408+)
- [x] Handle errors on sign up
- [x] Handle errors on sign in
- [ ] Create profile page
- [ ] Make a list of metrics and dimensions to include
- [ ] Create report generator page
- [ ] Create report view
- [ ] Expose and store GA viewids
- [ ] Setup RLS on Supabase

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
