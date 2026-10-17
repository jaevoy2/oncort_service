import heroImg from './assets/hero.jpg'

const u = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`

export const business = {
  name: 'Oncort',
  tagline: 'Commercial / Janitorial Cleaning Service',
  phone: '(205) 222-3947',
  tollFree: '(866) 448-3125',
  fax: '(205) 623-0165',
  email: 'info@oncort.com',
  address: '1919 Oxmoor Road, Suite #341, Homewood, AL 35209',
}

export const nav = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Employment', href: '#employment' },
  { label: 'Referral Program', href: '#referral' },
]

export const images = {
  hero: heroImg,
  about: u('1497366216548-37526070297c', 1000),
  germs: u('1584622650111-993a426fbf0a', 1000),
  commitment: u('1556761175-5973dc0f32e7', 1000),
}

export const industries = [
  { title: 'Medical Facilities', text: 'Hospital-grade disinfection for clinics, offices and care centers.', img: u('1519494026892-80bbd2d6fd0d', 700) },
  { title: 'Airports', text: 'High-traffic terminals kept spotless around the clock.', img: u('1436491865332-7a61a109cc05', 700) },
  { title: 'Offices', text: 'Daily janitorial service for a productive workplace.', img: u('1504384308090-c894fdcc538d', 700) },
  { title: 'Places of Worship', text: 'Respectful, careful cleaning for sanctuaries and halls.', img: u('1438232992991-995b7058bbb3', 700) },
  { title: 'Restaurants', text: 'Kitchens and dining rooms cleaned to health standards.', img: u('1414235077428-338989a2e8c0', 700) },
  { title: 'Retail', text: 'Showroom-ready stores that welcome every customer.', img: u('1441986300917-64674bd600d8', 700) },
  { title: 'Educational Buildings', text: 'Safe, healthy classrooms and campuses.', img: u('1580582932707-520aed937b7b', 700) },
  { title: 'Auto Dealerships', text: 'Polished floors and spotless showrooms and service areas.', img: u('1562426509-5044a121aa49', 700) },
]

export const services = [
  { icon: 'floor', page: 'floor-maintenance', title: 'Floor Maintenance', text: 'Floor stripping, waxing and routine care that restore shine and extend floor life.' },
  { icon: 'shield', title: 'Disinfection', text: 'Hospital-grade disinfectants help you meet industry standards and get rid of germs.' },
  { icon: 'building', title: 'Janitorial Service', text: 'Customizable, professional, quality-driven daily or weekly cleaning plans.' },
  { icon: 'sparkle', page: 'additional-services', title: 'Additional Services', text: 'Tailored extras for your building. Ask us about anything you need.' },
]

export const floorServices = [
  { title: 'VCT Tile', text: 'Strip and wax, or strip and recoat.' },
  { title: 'Carpet Cleaning', text: 'Hot water extraction or bonnet cleaning.' },
  { title: 'Concrete', text: 'Polishing for a durable, easy-to-clean surface.' },
  { title: 'Pressure Washing', text: 'Removes built-up dirt on exteriors and walkways.' },
]

export const extraServices = [
  { title: 'Day Porter', text: 'On-site support during evenings or your busiest times: restroom monitoring, restocking, entrances, kitchens, common areas and heavy trash removal. Hourly or monthly contract.' },
  { title: 'Emergency Cleaning', text: 'Immediate help for urgent or unexpected cleaning problems.' },
  { title: 'One-Time Cleaning', text: 'A thorough clean before opening day or after renovations, removing dirt, debris and germs.' },
  { title: 'Ordered Supplies', text: 'Paper products, soap, sanitizer, wipes, trash bags, detergents and glass cleaner, stocked for you.' },
]

export const steps = [
  { n: '01', title: 'Schedule a Consultation', text: 'Tell us about your facility and your needs.' },
  { n: '02', title: 'Custom Cleaning Plan', text: 'We build a plan around your industry and budget.' },
  { n: '03', title: 'Enjoy a 5-Star Clean', text: 'Our screened, trained team delivers every time.' },
]

export const employment = [
  { title: 'Apply For Employment', text: 'Join a team that takes pride in its work.' },
  { title: 'Employee Screening', text: 'Every team member is carefully screened.' },
  { title: 'Training', text: 'Ongoing training keeps our standards high.' },
  { title: 'Appearance', text: 'Uniformed, professional staff you can trust.' },
]
