// import { TAcademicSemester } from '../AcademicSemester/academicSemester.interface';
import { User } from './user.model';

// Seller ID
export const findLastSellerId = async () => {
  const lastSeller = await User.findOne(
    {
      role: 'seller',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastSeller?.id ? lastSeller.id.substring(2) : undefined;
};

export const generateSellerId = async () => {
  let currentId = (0).toString();
  const lastSellerId = await findLastSellerId();

  if (lastSellerId) {
    currentId = lastSellerId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `S-${incrementId}`;
  return incrementId;
};

// Manager ID
export const findLastManagerId = async () => {
  const lastManager = await User.findOne(
    {
      role: 'manager',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastManager?.id ? lastManager.id.substring(2) : undefined;
};

export const generateManagerId = async () => {
  let currentId = (0).toString();
  const lastManagerId = await findLastManagerId();

  if (lastManagerId) {
    currentId = lastManagerId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `M-${incrementId}`;
  return incrementId;
};
