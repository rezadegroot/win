/** Gerichte lokale contentmigratie. Draai alleen met een localhost-database. */
import { getPayload } from "payload";
import config from "@payload-config";
import { pages, services } from "./win-site-content";

async function main() {
  const database = new URL(process.env.DATABASE_URI ?? "");
  if (!["localhost", "127.0.0.1", "[::1]"].includes(database.hostname)) {
    throw new Error(
      "Deze contentmigratie mag alleen op een lokale database draaien.",
    );
  }

  const payload = await getPayload({ config });
  const media = await payload.find({
    collection: "media",
    limit: 100,
    depth: 0,
  });
  const fotos = new Map(media.docs.map((foto) => [foto.filename, foto.id]));
  for (const [name, alt] of [
    ["nimmerdor 6.jpeg", "Portret van Reza de Groot buiten op Nimmerdor"],
    ["nimmerdor 12.jpeg", "Portret van Reza de Groot in het herfstbos"],
    [
      "nimmerdor 3.jpeg",
      "Reza de Groot zittend in het landschap van Nimmerdor",
    ],
    ["nimmerdor 11.jpeg", "Reza de Groot staand in het herfstbos"],
  ] as const) {
    const id = fotos.get(name);
    if (id) await payload.update({ collection: "media", id, data: { alt } });
  }
  const fotoId = (name?: string) => {
    if (!name) return undefined;
    const id = fotos.get(name);
    if (!id) throw new Error(`WIN-foto ontbreekt in Payload: ${name}`);
    return id;
  };

  for (const service of services) {
    const found = await payload.find({
      collection: "diensten",
      where: { route: { equals: service.route } },
      limit: 1,
      depth: 0,
    });
    if (found.docs[0]) {
      await payload.update({
        collection: "diensten",
        id: found.docs[0].id,
        data: { ...service },
      });
    } else {
      await payload.create({ collection: "diensten", data: { ...service } });
    }
  }

  for (const page of pages) {
    const { fotoNaam, ...hero } = page.hero;
    const data = {
      titel: page.titel,
      slug: page.slug,
      metaTitel: page.metaTitel,
      metaOmschrijving: page.metaOmschrijving,
      hero: {
        ...hero,
        kop: {
          voor: hero.kop.voor ?? null,
          accent: hero.kop.accent ?? null,
          na: hero.kop.na ?? null,
        },
        subtitel: hero.subtitel ?? null,
        introZin: hero.introZin ?? null,
        pillLabel: null,
        fotoFocus: hero.type === "paginaHero" ? "center 25%" : null,
        secundaireCta: hero.secundaireCta ?? { label: null, doel: null },
        cta: hero.cta ?? { label: null, doel: null },
        foto: fotoId(fotoNaam),
      },
      layout: page.layout.map((block) => {
        const { fotoNaam: blockFoto, ...rest } = block;
        return blockFoto ? { ...rest, foto: fotoId(String(blockFoto)) } : rest;
      }),
      _status: "published" as const,
    };
    const found = await payload.find({
      collection: "paginas",
      where: { slug: { equals: page.slug } },
      limit: 1,
      depth: 0,
    });
    if (found.docs[0]) {
      await payload.update({
        collection: "paginas",
        id: found.docs[0].id,
        data: data as never,
        draft: false,
      });
    } else {
      await payload.create({
        collection: "paginas",
        data: data as never,
        draft: false,
      });
    }
    payload.logger.info(`[win-site] ${page.slug} lokaal bijgewerkt`);
  }
  await payload.destroy();
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
