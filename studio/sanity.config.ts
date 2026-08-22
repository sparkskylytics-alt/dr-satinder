import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from '../sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Dr Satinder Eye Care',
  projectId: 'qlsz3ia2',
  dataset: 'production',
  plugins: [structureTool({
    structure: (S) => S.list().title('Website sections').items([
      ['Hero', 'heroSection'], ['About hospital', 'aboutSection'], ['Team', 'teamSection'], ['Services', 'servicesSection'], ['Technology', 'technologySection'], ['Gallery', 'gallerySection'], ['Community outreach', 'communitySection'], ['Clinic videos', 'videosSection'], ['Media', 'mediaSection'], ['Testimonials', 'testimonialsSection'], ['Contact', 'contactSection'], ['Footer', 'footerSection'],
    ].map(([title, schemaType]) => S.listItem().title(title).child(S.document().schemaType(schemaType).documentId(schemaType)))),
  })],
  schema: { types: schemaTypes },
})
