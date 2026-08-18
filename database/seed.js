
const bcrypt = require('bcryptjs');
const { query } = require('./db.js');

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');

    const password = await bcrypt.hash('password123', 10);
    
    const caregivers = [
      {
        email: 'caregiver1@example.com',
        name: 'John',
        surname: 'Smith',
        phone: '555-123-4567',
        location: 'Toronto, ON',
        price_range: 25,
        specialties: ['Physical Therapy', 'Personal Care', 'Medical Care']
      },
      {
        email: 'caregiver2@example.com',
        name: 'Mary',
        surname: 'Johnson',
        phone: '555-234-5678',
        location: 'Vancouver, BC',
        price_range: 35,
        specialties: ['Meal Preparation', 'Companionship', 'Transportation']
      },
      {
        email: 'caregiver3@example.com',
        name: 'James',
        surname: 'Wilson',
        phone: '555-345-6789',
        location: 'Toronto, ON',
        price_range: 45,
        specialties: ['Medical Care', 'Personal Care', 'Physical Therapy', 'Companionship']
      },
      {
        email: 'caregiver4@example.com',
        name: 'Emma',
        surname: 'Davis',
        phone: '555-456-7890',
        location: 'Montreal, QC',
        price_range: 30,
        specialties: ['Companionship', 'Meal Preparation', 'Transportation']
      },
      {
        email: 'caregiver5@example.com',
        name: 'Michael',
        surname: 'Taylor',
        phone: '555-567-8901',
        location: 'Vancouver, BC',
        price_range: 40,
        specialties: ['Physical Therapy', 'Medical Care', 'Personal Care']
      }
    ];
    
    const patients = [
      {
        email: 'patient1@example.com',
        name: 'Robert',
        surname: 'Williams',
        phone: '555-678-9012',
        location: 'Toronto, ON',
        price_range: 30,
        needs: ['Physical Therapy', 'Medical Care']
      },
      {
        email: 'patient2@example.com',
        name: 'Sarah',
        surname: 'Brown',
        phone: '555-789-0123',
        location: 'Vancouver, BC',
        price_range: 40,
        needs: ['Meal Preparation', 'Companionship']
      },
      {
        email: 'patient3@example.com',
        name: 'David',
        surname: 'Lee',
        phone: '555-890-1234',
        location: 'Toronto, ON',
        price_range: 35,
        needs: ['Personal Care', 'Transportation', 'Medical Care']
      },
      {
        email: 'patient4@example.com',
        name: 'Linda',
        surname: 'Martinez',
        phone: '555-901-2345',
        location: 'Montreal, QC',
        price_range: 25,
        needs: ['Companionship', 'Meal Preparation']
      },
      {
        email: 'patient5@example.com',
        name: 'William',
        surname: 'Anderson',
        phone: '555-012-3456',
        location: 'Vancouver, BC',
        price_range: 45,
        needs: ['Physical Therapy', 'Medical Care', 'Personal Care']
      }
    ];

    // Insert caregivers
    for (const caregiver of caregivers) {
      await query(
        'INSERT INTO users (email, password, name, surname, phone, user_type, location, price_range, specialties) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT (email) DO NOTHING',
        [caregiver.email, password, caregiver.name, caregiver.surname, caregiver.phone, 'caregiver', caregiver.location, caregiver.price_range, caregiver.specialties]
      );
    }

    // Insert patients
    for (const patient of patients) {
      await query(
        'INSERT INTO users (email, password, name, surname, phone, user_type, location, price_range, needs) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT (email) DO NOTHING',
        [patient.email, password, patient.name, patient.surname, patient.phone, 'patient', patient.location, patient.price_range, patient.needs]
      );
    }

    console.log('Database seeding completed successfully!');
  } catch (err) {
    console.error('Error seeding database:', err);
  }
}

// Run the seeding function
seedDatabase().then(() => {
  console.log('Seed process finished.');
  process.exit(0);
}).catch(err => {
  console.error('Seed process failed:', err);
  process.exit(1);
});
