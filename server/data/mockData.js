import { Types } from 'mongoose';
import bcrypt from 'bcryptjs';

// Helper function to create ObjectIds
const createId = () => new Types.ObjectId();

// Create fixed IDs for reference
const userIds = {
  hospital1: createId(),
  hospital2: createId(),
  supplier1: createId(),
  supplier2: createId(),
  clinic1: createId(),
  distributor1: createId()
};

const requirementIds = Array.from({ length: 10 }, () => createId());
const quoteIds = Array.from({ length: 20 }, () => createId());
const connectionIds = Array.from({ length: 15 }, () => createId());
const notificationIds = Array.from({ length: 30 }, () => createId());

// Mock Users
export const users = [
  {
    _id: userIds.hospital1,
    name: 'Central Hospital',
    email: 'central@hospital.com',
    password: bcrypt.hashSync('password123', 10),
    mobile: '+1234567890',
    role: 'hospital',
    shopName: 'Central City Hospital',
    subscription: {
      plan: 'premium',
      validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    },
    isVerified: true
  },
  {
    _id: userIds.supplier1,
    name: 'MedSupply Co',
    email: 'info@medsupply.com',
    password: bcrypt.hashSync('password123', 10),
    mobile: '+1987654321',
    role: 'supplier',
    shopName: 'MedSupply Corporation',
    subscription: {
      plan: 'enterprise',
      validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    },
    isVerified: true
  },
  {
    _id: userIds.clinic1,
    name: 'Downtown Clinic',
    email: 'info@downtownclinic.com',
    password: bcrypt.hashSync('password123', 10),
    mobile: '+1122334455',
    role: 'clinic',
    shopName: 'Downtown Medical Clinic',
    subscription: {
      plan: 'basic',
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    isVerified: true
  }
];

// Mock Requirements
export const requirements = [
  {
    _id: requirementIds[0],
    user: userIds.hospital1,
    title: 'Emergency Medical Supplies Needed',
    description: 'Urgent requirement for various medical supplies including PPE and surgical instruments.',
    items: [
      {
        name: 'N95 Masks',
        quantity: 1000,
        unit: 'pieces'
      },
      {
        name: 'Surgical Gloves',
        quantity: 5000,
        unit: 'pairs'
      },
      {
        name: 'Surgical Gowns',
        quantity: 500,
        unit: 'pieces'
      }
    ],
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: 'open',
    category: 'medical',
    visibility: 'public',
    views: 150,
    quotes: [quoteIds[0], quoteIds[1]]
  },
  {
    _id: requirementIds[1],
    user: userIds.clinic1,
    title: 'Laboratory Equipment Required',
    description: 'Looking for high-quality laboratory equipment for our new diagnostic center.',
    items: [
      {
        name: 'Microscope',
        quantity: 2,
        unit: 'units'
      },
      {
        name: 'Centrifuge',
        quantity: 1,
        unit: 'unit'
      }
    ],
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    status: 'open',
    category: 'equipment',
    visibility: 'public',
    views: 89,
    quotes: [quoteIds[2]]
  }
];

// Mock Quotes
export const quotes = [
  {
    _id: quoteIds[0],
    requirement: requirementIds[0],
    fromUser: userIds.supplier1,
    toUser: userIds.hospital1,
    items: [
      {
        name: 'N95 Masks',
        quantity: 1000,
        unit: 'pieces',
        price: 2.5
      },
      {
        name: 'Surgical Gloves',
        quantity: 5000,
        unit: 'pairs',
        price: 0.5
      },
      {
        name: 'Surgical Gowns',
        quantity: 500,
        unit: 'pieces',
        price: 10
      }
    ],
    totalPrice: 7500,
    status: 'pending',
    validUntil: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    notes: 'All items are FDA approved and ready for immediate dispatch.',
    deliveryTime: '3-5 business days'
  }
];

// Mock Connections
export const connections = [
  {
    _id: connectionIds[0],
    fromUser: userIds.hospital1,
    toUser: userIds.supplier1,
    status: 'accepted',
    message: 'Would like to establish a long-term supply partnership.',
    type: 'direct'
  },
  {
    _id: connectionIds[1],
    fromUser: userIds.clinic1,
    toUser: userIds.supplier1,
    status: 'pending',
    message: 'Interested in your medical supplies catalog.',
    type: 'direct'
  }
];

// Mock Notifications
export const notifications = [
  {
    _id: notificationIds[0],
    user: userIds.hospital1,
    type: 'quote',
    title: 'New Quote Received',
    message: 'You have received a new quote for your medical supplies requirement.',
    read: false,
    relatedModel: 'Quote',
    relatedId: quoteIds[0]
  },
  {
    _id: notificationIds[1],
    user: userIds.supplier1,
    type: 'connection',
    title: 'New Connection Request',
    message: 'Downtown Clinic wants to connect with you.',
    read: false,
    relatedModel: 'Connection',
    relatedId: connectionIds[1]
  }
];

// Export all mock data
export default {
  users,
  requirements,
  quotes,
  connections,
  notifications,
  ids: {
    users: userIds,
    requirements: requirementIds,
    quotes: quoteIds,
    connections: connectionIds,
    notifications: notificationIds
  }
};