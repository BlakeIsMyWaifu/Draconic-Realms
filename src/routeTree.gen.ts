/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TownImport } from './routes/town'
import { Route as SkillsImport } from './routes/skills'
import { Route as SettingsImport } from './routes/settings'
import { Route as RealmsImport } from './routes/realms'
import { Route as RealmGearImport } from './routes/realmGear'
import { Route as RealmImport } from './routes/realm'
import { Route as GearImport } from './routes/gear'
import { Route as DevImport } from './routes/dev'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const TownRoute = TownImport.update({
  path: '/town',
  getParentRoute: () => rootRoute,
} as any)

const SkillsRoute = SkillsImport.update({
  path: '/skills',
  getParentRoute: () => rootRoute,
} as any)

const SettingsRoute = SettingsImport.update({
  path: '/settings',
  getParentRoute: () => rootRoute,
} as any)

const RealmsRoute = RealmsImport.update({
  path: '/realms',
  getParentRoute: () => rootRoute,
} as any)

const RealmGearRoute = RealmGearImport.update({
  path: '/realmGear',
  getParentRoute: () => rootRoute,
} as any)

const RealmRoute = RealmImport.update({
  path: '/realm',
  getParentRoute: () => rootRoute,
} as any)

const GearRoute = GearImport.update({
  path: '/gear',
  getParentRoute: () => rootRoute,
} as any)

const DevRoute = DevImport.update({
  path: '/dev',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/dev': {
      id: '/dev'
      path: '/dev'
      fullPath: '/dev'
      preLoaderRoute: typeof DevImport
      parentRoute: typeof rootRoute
    }
    '/gear': {
      id: '/gear'
      path: '/gear'
      fullPath: '/gear'
      preLoaderRoute: typeof GearImport
      parentRoute: typeof rootRoute
    }
    '/realm': {
      id: '/realm'
      path: '/realm'
      fullPath: '/realm'
      preLoaderRoute: typeof RealmImport
      parentRoute: typeof rootRoute
    }
    '/realmGear': {
      id: '/realmGear'
      path: '/realmGear'
      fullPath: '/realmGear'
      preLoaderRoute: typeof RealmGearImport
      parentRoute: typeof rootRoute
    }
    '/realms': {
      id: '/realms'
      path: '/realms'
      fullPath: '/realms'
      preLoaderRoute: typeof RealmsImport
      parentRoute: typeof rootRoute
    }
    '/settings': {
      id: '/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof SettingsImport
      parentRoute: typeof rootRoute
    }
    '/skills': {
      id: '/skills'
      path: '/skills'
      fullPath: '/skills'
      preLoaderRoute: typeof SkillsImport
      parentRoute: typeof rootRoute
    }
    '/town': {
      id: '/town'
      path: '/town'
      fullPath: '/town'
      preLoaderRoute: typeof TownImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  DevRoute,
  GearRoute,
  RealmRoute,
  RealmGearRoute,
  RealmsRoute,
  SettingsRoute,
  SkillsRoute,
  TownRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/dev",
        "/gear",
        "/realm",
        "/realmGear",
        "/realms",
        "/settings",
        "/skills",
        "/town"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/dev": {
      "filePath": "dev.tsx"
    },
    "/gear": {
      "filePath": "gear.tsx"
    },
    "/realm": {
      "filePath": "realm.tsx"
    },
    "/realmGear": {
      "filePath": "realmGear.tsx"
    },
    "/realms": {
      "filePath": "realms.tsx"
    },
    "/settings": {
      "filePath": "settings.tsx"
    },
    "/skills": {
      "filePath": "skills.tsx"
    },
    "/town": {
      "filePath": "town.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
