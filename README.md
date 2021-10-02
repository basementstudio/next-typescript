# basehub

## Getting Started

```bash
yarn && yarn dev
```

## Database

We use PlanetScale as our main database. We connect to PlanetScale via Prisma.

- Go to PlanetScale dashboard: [https://app.planetscale.com/basementstudio/basehub-prisma/](https://app.planetscale.com/basementstudio/basehub-prisma/).
- Read PlanetScale docs: [https://docs.planetscale.com/](https://docs.planetscale.com/).
- Read Prisma docs: [https://www.prisma.io/docs/](https://www.prisma.io/docs/).

### Getting Started with PlanetScale

1. Go through the [PlanetScale environment set up](https://docs.planetscale.com/reference/planetscale-environment-setup).
2. Login

```bash
pscale auth login
```

3. Switch to `basementstudio` org:

```bash
pscale org switch basementstudio
```

### Mutating Database Schema

Once you have your modified `schema.prisma` ready, follow these instructions to create a [Deploy Request](https://docs.planetscale.com/concepts/branching#deploying-branches) into our prod branch.

1. Create your branch:

```bash
pscale branch create basehub-prisma <branch-name>
```

2. Run local databases:

In one terminal instance:

```bash
yarn db-shadow
```

In another terminal instance:

```bash
yarn db-branch <branch-name>
```

4. Run prisma migrations:

```bash
npx prisma migrate dev
```

5. Create Deploy Request:

```bash
pscale deploy-request create basehub-prisma <branch-name>
```

That's all. You just created a Deploy Request. Take a look at it in the [PlanetScale dashboard](https://app.planetscale.com/basementstudio/basehub-prisma/deploy-requests). Let's get that thing reviewed and deployed!
