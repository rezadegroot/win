# WIN Instituut

De publieke website van WIN Instituut, met Next.js en Payload CMS.

## Lokaal starten

```bash
npm ci
npm run dev
```

Voor de CMS-content en bestaande beelden zijn `DATABASE_URI`, `PAYLOAD_SECRET` en `BLOB_READ_WRITE_TOKEN` nodig. Bewaar deze waarden uitsluitend als omgevingsvariabelen; `.env*` staat buiten Git. Zet `NEXT_PUBLIC_SITE_URL` op de URL van deze publicatie.

## Publicatie

De repository is gekoppeld aan het Vercel-project van WIN Instituut. Pushes op `main` bouwen en publiceren de website. De inhoud staat in de aparte WIN-database; de bestaande WIN-website en haar database blijven zelfstandig werken.
