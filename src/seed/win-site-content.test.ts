import assert from "node:assert/strict";
import { test } from "node:test";
import { pages, services } from "./win-site-content";

test("vijf WIN-diensten hebben elk een bestaande doelpagina", () => {
  assert.equal(services.length, 5);
  const slugs = new Set(pages.map((page) => page.slug));
  for (const service of services)
    assert.ok(slugs.has(service.route.slice(1)), service.route);
});

test("de bezoekersreis en bestaande URL’s blijven compleet", () => {
  const slugs = new Set(pages.map((page) => page.slug));
  const routes = new Set([
    "/",
    "/kennismaking",
    ...pages.map((page) => `/${page.slug}`),
  ]);
  for (const slug of [
    "home",
    "methodiek",
    "aanbod",
    "coaching",
    "mentorschap",
    "opleidingen",
    "organisaties",
    "wininstituut",
    "kennismaking",
    "weerbaarheidsmentor",
    "kennisinstituut",
    "ontwikkellijn",
  ]) {
    assert.ok(slugs.has(slug), slug);
  }
  for (const page of pages) {
    assert.ok(page.metaTitel.length <= 60, page.slug);
    assert.ok(page.metaOmschrijving.length <= 160, page.slug);
    assert.ok(page.layout.length >= 2, page.slug);
    const links = JSON.stringify({
      hero: page.hero,
      layout: page.layout,
    }).matchAll(/"doel":"(\/[^"]*)"/g);
    for (const [, doel] of links)
      assert.ok(routes.has(doel), `${page.slug} → ${doel}`);
  }
});

test("onbevestigde aanbodclaims staan niet in de nieuwe publicatiecopy", () => {
  const copy = JSON.stringify({ pages, services }).toLowerCase();
  for (const claim of [
    "geaccrediteerd",
    "gecertificeerd",
    "€2.000",
    "€5.000",
    "gratis kennismaking",
    "30 minuten",
    "35 jaar",
    "40 jaar",
  ]) {
    assert.ok(!copy.includes(claim), claim);
  }
});
