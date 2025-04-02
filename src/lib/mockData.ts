import { addDays, subDays } from 'date-fns';

// Helper function to generate random IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Helper function to generate random user IDs
const userIds = Array.from({ length: 10 }, () => generateId());

// Mock Users
export const mockUsers = [
  {
    id: userIds[0],
    name: 'Central Hospital',
    email: 'central@hospital.com',
    role: 'hospital',
    shopName: 'Central City Hospital',
  },
  {
    id: userIds[1],
    name: 'MedSupply Co',
    email: 'info@medsupply.com',
    role: 'supplier',
    shopName: 'MedSupply Corporation',
  },
  {
    id: userIds[2],
    name: 'Downtown Clinic',
    email: 'info@downtownclinic.com',
    role: 'clinic',
    shopName: 'Downtown Medical Clinic',
  }
];

// Mock Requirements
export const mockRequirements = Array.from({ length: 50 }, (_, i) => ({
  _id: `req_${i + 1}`,
  title: `Medical Supply Requirement #${i + 1}`,
  description: `Urgent requirement for various medical supplies including PPE, surgical instruments, and diagnostic equipment. Priority delivery needed.`,
  user: userIds[Math.floor(Math.random() * userIds.length)],
  shopName: mockUsers[Math.floor(Math.random() * mockUsers.length)].shopName,
  deadline: addDays(new Date(), Math.floor(Math.random() * 30)).toISOString(),
  status: ['open', 'closed', 'expired'][Math.floor(Math.random() * 3)],
  items: [
    {
      name: 'Surgical Masks',
      quantity: Math.floor(Math.random() * 1000) + 100,
      unit: 'boxes'
    },
    {
      name: 'Nitrile Gloves',
      quantity: Math.floor(Math.random() * 500) + 50,
      unit: 'boxes'
    },
    {
      name: 'Digital Thermometers',
      quantity: Math.floor(Math.random() * 50) + 10,
      unit: 'units'
    }
  ],
  createdAt: subDays(new Date(), Math.floor(Math.random() * 30)).toISOString()
}));

// Mock Quotes
export const mockQuotes = Array.from({ length: 40 }, (_, i) => {
  const isPrivate = Math.random() > 0.7;
  const fromUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
  const toUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
  const requirement = mockRequirements[Math.floor(Math.random() * mockRequirements.length)];
  
  return {
    _id: `quote_${i + 1}`,
    requirement: requirement._id,
    requirementTitle: requirement.title,
    fromUser: fromUser.id,
    fromShopName: fromUser.shopName,
    toUser: toUser.id,
    toShopName: toUser.shopName,
    items: [
      {
        name: 'Surgical Masks',
        quantity: Math.floor(Math.random() * 1000) + 100,
        unit: 'boxes',
        price: Math.floor(Math.random() * 500) + 100
      },
      {
        name: 'Nitrile Gloves',
        quantity: Math.floor(Math.random() * 500) + 50,
        unit: 'boxes',
        price: Math.floor(Math.random() * 300) + 50
      }
    ],
    totalPrice: Math.floor(Math.random() * 10000) + 1000,
    status: ['pending', 'accepted', 'rejected'][Math.floor(Math.random() * 3)],
    isPrivate,
    notes: isPrivate ? 'Special private quote with custom pricing' : 'Standard quote',
    deliveryTime: ['3-5 days', '1 week', '2 weeks'][Math.floor(Math.random() * 3)],
    createdAt: subDays(new Date(), Math.floor(Math.random() * 10)).toISOString(),
    validUntil: addDays(new Date(), 1).toISOString()
  };
});

// Mock Connections
export const mockConnections = Array.from({ length: 15 }, (_, i) => {
  const fromUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
  const toUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
  
  return {
    _id: `conn_${i + 1}`,
    fromUser: fromUser.id,
    fromShopName: fromUser.shopName,
    toUser: toUser.id,
    toShopName: toUser.shopName,
    status: ['pending', 'accepted', 'rejected'][Math.floor(Math.random() * 3)],
    createdAt: subDays(new Date(), Math.floor(Math.random() * 30)).toISOString(),
    message: 'Would like to establish a business relationship for medical supplies'
  };
});

// Mock Notifications
export const mockNotifications = Array.from({ length: 25 }, (_, i) => ({
  _id: `notif_${i + 1}`,
  type: ['quote', 'connection', 'requirement', 'subscription'][Math.floor(Math.random() * 4)],
  title: [
    'New Quote Received',
    'Connection Request',
    'Requirement Update',
    'Subscription Renewal'
  ][Math.floor(Math.random() * 4)],
  message: [
    'You have received a new quote for your requirement',
    'A new supplier wants to connect with you',
    'Your requirement is about to expire',
    'Your subscription will renew soon'
  ][Math.floor(Math.random() * 4)],
  read: Math.random() > 0.5,
  createdAt: subDays(new Date(), Math.floor(Math.random() * 7)).toISOString()
}));