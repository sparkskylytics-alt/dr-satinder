import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { apiVersion, dataset, projectId } from './env'

config({ path: '.env.local' })

const token = process.env.SANITY_API_WRITE_TOKEN
if (!token) throw new Error('SANITY_API_WRITE_TOKEN is required. Add it to .env.local before running this script.')

const items = [
  ['I had been struggling with blurry vision for quite some time. After consulting the doctor, I decided to go ahead with cataract treatment. Everything was explained clearly and the overall experience was very comfortable.', 'Balwinder Singh', 'Cataract Surgery'],
  ['My vision had become quite cloudy because of cataract. The doctor explained the procedure patiently and answered all our questions. The staff was cooperative and helpful throughout.', 'Gurmeet Kaur', 'Cataract Treatment'],
  ['My father had cataract in both eyes and we were looking for a reliable eye care centre. We were satisfied with the consultation and treatment. The doctors and staff treated us very politely.', 'Rajinder Kumar', 'Cataract Surgery'],
  ['I visited for a complete eye check-up because my vision was becoming weaker. The examination was detailed and the doctor explained the problem in a simple way. Good experience overall.', 'Sunita Sharma', 'Eye Check-up'],
  ['I was initially quite nervous about cataract surgery, but the doctor explained everything properly and made me feel comfortable. The entire process was handled professionally.', 'Harpreet Singh', 'Cataract Consultation'],
  ['I was having difficulty seeing clearly, especially while reading. I came for an eye examination and received proper advice regarding my vision and glasses. The staff was very courteous.', 'Manpreet Kaur', 'Vision / Glasses Check'],
  ['My eyesight had deteriorated gradually and everyday activities were becoming difficult. After consultation, I underwent cataract treatment. I am happy with the care and guidance provided by the team.', 'Sukhdev Singh', 'Cataract Surgery'],
  ['I came for an eye examination as I wanted to keep a regular check on my eyesight. The doctor took time to examine my eyes properly and explained why regular eye check-ups are important.', 'Neha Gupta', 'Diabetic Eye Check-up'],
  ['I had been experiencing irritation and discomfort in my eyes for some time. The consultation was helpful and I received clear guidance about taking care of my eyes. Overall, a good experience.', 'Rakesh Verma', 'General Eye Problem'],
  ['My mother was having difficulty seeing clearly due to cataract. We were guided properly from the consultation onwards. The staff was supportive and the doctor explained each step patiently.', 'Amandeep Kaur', 'Cataract Treatment'],
  ['I visited the centre for an eye examination and eye pressure check. The doctor explained the findings carefully and suggested the necessary follow-up. I appreciated the detailed consultation.', 'Pankaj Sharma', 'Glaucoma / Eye Pressure Check'],
  ['I took my daughter for an eye check-up and was happy with the way the examination was done. The doctor was patient and made her feel comfortable during the consultation.', 'Simran Kaur', 'Children’s Eye Check-up'],
  ['I had been postponing my cataract treatment because I was worried about the procedure. After speaking with the doctor, I felt much more confident. The whole experience was smooth and reassuring.', 'Ashok Kumar', 'Cataract Surgery'],
  ['I noticed that my eyesight was not as clear as before, especially while working and reading. The eye examination was thorough and the doctor explained the results properly. Very professional experience.', 'Rajesh Mehta', 'Vision Check-up'],
  ['I came here for a cataract consultation and was impressed with the overall approach to eye care. The doctor listened carefully and explained the treatment options without rushing the consultation.', 'Jaswinder Singh', 'Cataract Consultation'],
  ['I was having frequent dryness and irritation in my eyes, especially after spending long hours on screens. The doctor understood the problem and gave me useful advice and treatment. I had a good consultation experience.', 'Priya Kapoor', 'Dry Eye Treatment'],
  ['My eyesight had become very weak because of cataract and I was finding it difficult to manage my daily activities. The doctor explained the treatment clearly and the staff guided us throughout the process.', 'Mohan Lal', 'Cataract Surgery'],
  ['I visited the centre for a routine eye examination. The staff was polite and the doctor gave proper time during the consultation. I liked that everything was explained clearly instead of rushing through the appointment.', 'Kavita Rani', 'Regular Eye Examination'],
  ['My family recommended this eye care centre when I started having problems with cloudy vision. The consultation was reassuring and the doctor answered all my questions. Overall, a positive experience.', 'Deepak Sharma', 'Cataract Consultation'],
  ['I visited for an eye problem that I had been ignoring for a while. The examination was thorough and I received clear advice about the next steps. The team was professional and respectful throughout my visit.', 'Amarjit Singh', 'General Eye Care'],
].map(([quote, name, detail], index) => ({ _key: `item${index + 1}`, quote, name, detail }))

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

client.patch('testimonialsSection').set({ items }).commit()
  .then(() => console.log(`Published ${items.length} testimonials to ${projectId}/${dataset}.`))
  .catch((error) => { console.error('Publishing testimonials failed:', error); process.exitCode = 1 })
