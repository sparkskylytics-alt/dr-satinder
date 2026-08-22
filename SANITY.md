# Sanity setup

The Sanity project is configured as `qlsz3ia2` with the `production` dataset. The organisation ID is managed by Sanity and does not belong in frontend configuration.

1. Copy `.env.example` to `.env.local`.
2. In Sanity Manage, create a write token for this project and add it as `SANITY_API_WRITE_TOKEN` in `.env.local`.
3. Run `npm run sanity:seed` to create or update the individual section documents with the current site content.
4. Start the Studio. It shares the Sanity CLI already installed with the main app:

   ```powershell
   npm run dev --prefix studio
   ```

   The Studio opens at `http://localhost:3333`. Add `http://localhost:3000` in the project CORS origins in Sanity Manage before using the frontend against a private dataset.

The Studio sidebar contains individual documents for Hero, About hospital, Team, Services, Technology, Gallery, Clinic videos, Media, Testimonials, and Contact. Images are editable Sanity image fields. The prior local paths are preserved internally during migration but hidden from the editor; upload each image into its new image field when you are ready to move media into Sanity.
