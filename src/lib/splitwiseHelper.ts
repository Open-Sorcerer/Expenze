import { redis1 } from "./db";

// splitwise helper functions

interface User {
  walletAddress: string;
  userId: string;
  preferredBlockchain: string;
  groupsHeIsIn: string[];
}

interface expense {
  expenseId: number;
  groupId: string;
  payer: string;
  amount: number;
  participants: string[];
  description: string;
  timestamp: number;
  settled: boolean;
}

interface settlingTxnsEntry {
  payerWallet: string;
  receiverWallet: string;
  settled: boolean;
}

interface Group {
  groupName: string;
  users: string[];
  expenses: expense[];
  settllingTxns: settlingTxnsEntry[];
  groupDescription: string;
}

interface AddressBookEntry {
  walletAddress: string;
  name: string;
}

interface AddressBook {
  user: string;
  friendsData: AddressBookEntry[];
}

let userIdCounter = 0;
let groupIdCounter = 0;
let expenseIdCounter = 0;

export const registerUser = async (
  walletAddress: string,
  preferredBlockchain: string
) => {
  console.log("registering user");
  // check if the user is already in the database
  const user = (await redis1.get(`user:${walletAddress}`)) as string;
  if (user) {
    // if they are, return the user
    console.log("user already registered");
    return;
  }

  // check if the splitwiseId is already in the database
  const userId = (await redis1.get("userIdCounter")) as string;
  console.log("current splitwiseId: ", userId);
  if (userId !== null) {
    // increment the counter
    userIdCounter = parseInt(userId) + 1;
    await redis1.set("userIdCounter", userIdCounter.toString());
  } else {
    // if it isn't, set the counter to 0
    await redis1.set("userIdCounter", "0");
  }

  // store the user's wallet address, splitwiseId, and preferred blockchain

  await redis1.set(
    `user:${walletAddress}`,
    JSON.stringify({
      walletAddress,
      userId: userIdCounter,
      preferredBlockchain,
      groupsHeIsIn: [],
    })
  );

  console.log(`user registered with splitwiseId: ${userIdCounter}`);
};

export const updateUserDetails = async (
  walletAddress: string,
  preferredBlockchain: string
) => {
  console.log("updating user details");
  // check if the user is already in the database
  const user = (await redis1.get(`user:${walletAddress}`)) as User;
  if (!user) {
    // if they aren't, return
    console.log("user not registered");
    return;
  }

  // update the user's preferred blockchain
  user.preferredBlockchain = preferredBlockchain;

  // store the user's wallet address, splitwiseId, and preferred blockchain

  await redis1.set(`user:${walletAddress}`, JSON.stringify(user));

  console.log(`user details updated`);
};

export const createGroup = async (
  groupName: string,
  groupDescription: string,
  usersWalletAddresses: string[]
) => {
  console.log("creating group");

  // check if the users are registered in the database

  for (let user of usersWalletAddresses) {
    const userObject = (await redis1.get(`user:${user}`)) as User;

    if (userObject === null) {
      console.log("user not registered");

      // register the user

      await registerUser(user, "Polygon"); // default blockchain is Polygon

      console.log("user registered");
    }
  }

  // create the group
  const groupId = (await redis1.get("groupIdCounter")) as string;
  console.log("current groupId: ", groupId);

  if (groupId !== null) {
    // increment the counter
    groupIdCounter = parseInt(groupId) + 1;
    await redis1.set("groupIdCounter", groupIdCounter.toString());
  } else {
    // if it isn't, set the counter to 0
    await redis1.set("groupIdCounter", "0");
  }

  // store the group
  await redis1.set(
    `group:${groupIdCounter}`,
    JSON.stringify({
      groupName,
      groupId: groupIdCounter,
      groupDescription: groupDescription,
      users: usersWalletAddresses,
      expenses: [],
    })
  );

  console.log("group created");

  // add the group to the users' groupsHeIsIn

  for (let user of usersWalletAddresses) {
    const userObject = (await redis1.get(`user:${user}`)) as User;

    userObject.groupsHeIsIn.push(groupIdCounter.toString());

    await redis1.set(`user:${user}`, JSON.stringify(userObject));
  }

  console.log("group added to users");
};

export const updateGroupDetails = async (
  groupId: string,
  groupName: string,
  groupDescription: string,
  usersWalletAddresses: string[]
) => {
  console.log("updating group details");

  // check if the users are registered in the database

  for (let user of usersWalletAddresses) {
    const userObject = (await redis1.get(`user:${user}`)) as User;

    if (userObject === null) {
      console.log("user not registered");

      // register the user

      await registerUser(user, "Polygon"); // default blockchain is Polygon

      console.log("user registered");
    }
  }

  // update the group
  const group = (await redis1.get(`group:${groupId}`)) as Group;
  if (group === null) {
    console.log("group not found");

    return;
  }

  group.groupName = groupName;
  group.users = usersWalletAddresses;
  group.groupDescription = groupDescription;

  // store the group
  await redis1.set(`group:${groupId}`, JSON.stringify(group));

  console.log("group updated");

  // add the group to the users' groupsHeIsIn

  for (let user of usersWalletAddresses) {
    const userObject = (await redis1.get(`user:${user}`)) as User;

    // find if the groupId exists in the user's groupsHeIsIn
    const index = userObject.groupsHeIsIn.indexOf(groupId);

    if (index === -1) {
      // if it doesn't, add it
      console.log("user not in group");
      userObject.groupsHeIsIn.push(groupId as string);

      await redis1.set(`user:${user}`, JSON.stringify(userObject));

      console.log("group added to user");
    }
  }

  console.log("group added to users");
};

export const createExpense = async (
  groupId: string,
  payer: string,
  amount: number,
  participants: string[],
  description: string,
  timestamp: number
) => {
  console.log("creating expense");

  // check if the group exists

  const group = (await redis1.get(`group:${groupId}`)) as Group;
  if (group === null) {
    console.log("group not found");

    return;
  }

  // create the expense

  const expenseId = (await redis1.get("expenseIdCounter")) as string;
  console.log("current expenseId: ", expenseId);

  if (expenseId !== null) {
    // increment the counter
    expenseIdCounter = parseInt(expenseId) + 1;
    await redis1.set("expenseIdCounter", expenseIdCounter.toString());
  } else {
    // if it isn't, set the counter to 0
    await redis1.set("expenseIdCounter", "0");
  }

  // store the expense

  const txnSettled = false;

  await redis1.set(
    `expense:${expenseIdCounter}`,
    JSON.stringify({
      expenseId: expenseIdCounter,
      groupId,
      payer,
      amount,
      participants,
      description,
      timestamp,
      settled: false,
    })
  );

  console.log("expense created");

  // add the expense to the group

  group.expenses.push({
    expenseId: expenseIdCounter,
    groupId,
    payer,
    amount,
    participants,
    description,
    timestamp,
    settled: false,
  });

  await redis1.set(`group:${groupId}`, JSON.stringify(group));

  console.log("expense added to group");
};

export const updateExpenseDetails = async (
  expenseId: string,
  payer: string,
  amount: number,
  participants: string[],
  description: string,
  timestamp: number
) => {
  console.log("updating expense details");

  // check if the expense exists

  const expense = (await redis1.get(`expense:${expenseId}`)) as expense;
  if (expense === null) {
    console.log("expense not found");

    return;
  }

  // update the expense

  expense.payer = payer;
  expense.amount = amount;
  expense.participants = participants;
  expense.description = description;
  expense.timestamp = timestamp;

  // store the expense

  await redis1.set(`expense:${expenseId}`, JSON.stringify(expense));

  console.log("expense updated");
};

export const deleteExpense = async (expenseId: string) => {
  console.log("deleting expense");

  // check if the expense exists

  const expense = (await redis1.get(`expense:${expenseId}`)) as expense;
  if (expense === null) {
    console.log("expense not found");

    return;
  }

  // delete the expense

  await redis1.del(`expense:${expenseId}`);

  console.log("expense deleted");

  // delete the expense from the group

  const group = (await redis1.get(`group:${expense.groupId}`)) as Group;

  const index = group.expenses.findIndex(
    (expense) => expense.expenseId === parseInt(expenseId)
  );

  if (index === -1) {
    console.log("expense not found in group");

    return;
  }

  group.expenses.splice(index, 1);

  await redis1.set(`group:${expense.groupId}`, JSON.stringify(group));

  console.log("expense deleted from group");
};

export const calculateBalances = async (groupData: Group) => {
  // fetching all the expenses in the group
  const allExpenses = groupData.expenses;
  const users = groupData.users;

  // if a person needs to pay, the balance will be negative
  // if a person needs to receive money, the balance will be positive

  // create a balance object for each user
  const balances: { [key: string]: number } = {};

  for (let user of users) {
    balances[user] = 0;
  }

  // for each expense, calculate the balances
  for (let expense of allExpenses) {
    // calculate the amount each person needs to pay
    const amountPerPerson = expense.amount / expense.participants.length;

    // add the amount to the payer's balance

    balances[expense.payer] += expense.amount;

    // subtract the amount from the participants' balances

    for (let participant of expense.participants) {
      balances[participant] -= amountPerPerson;
    }
  }

  // return the balances
  return balances;
};

export const settleExpense = async (groupId: string) => {
  // fetch all the expenses in the group
  console.log("settling");

  const balance = await calculateBalances(
    (await redis1.get(`group:${groupId}`)) as Group
  );

  console.log("balance: ", balance);

  // create a list of debts for each person

  const debts: { person: string; amount: number }[] = [];

  for (const person in balance) {
    if (balance[person] !== 0) {
      debts.push({ person, amount: Number(balance[person]) });
    }
  }

  // sort the debts in ascending order based on the amount

  debts.sort((a, b) => a.amount - b.amount);

  let i = 0;

  let j = debts.length - 1;

  while (i < j) {
    const debtor = debts[i] as { person: string; amount: number };
    const creditor = debts[j] as { person: string; amount: number };

    const minTransaction = Math.min(-debtor.amount, creditor.amount);

    console.log(
      `${debtor.person} needs to pay ${creditor.person}: ${minTransaction}`
    );

    // send the transactions to redis

    debtor.amount += minTransaction;
    creditor.amount -= minTransaction;

    if (debtor.amount === 0) {
      i++;
    }

    if (creditor.amount === 0) {
      j--;
    }
  }

  return "settled";
};

export const addressBookAddition = async (
  user: string,
  friendsData: AddressBookEntry[]
) => {
  // check if the user is already in the database
  const userObject = (await redis1.get(`user:${user}`)) as User;
  if (!userObject) {
    // if they aren't, return
    console.log("user not registered");
    return;
  }

  // check if the address book exists
  // if it exists add a new entry to it
  // if it doesn't, create a new address book and add the entry to it

  const addressBook = (await redis1.get(`addressBook:${user}`)) as AddressBook;

  if (addressBook === null) {
    // if the address book doesn't exist, create a new one
    await redis1.set(
      `addressBook:${user}`,
      JSON.stringify({
        user,
        friendsData,
      })
    );
  } else {
    // if the address book exists, add the new entry to it
    addressBook.friendsData.push(...friendsData);

    await redis1.set(`addressBook:${user}`, JSON.stringify(addressBook));
  }
};

export const addressBookDeletion = async (user: string) => {
  // check if the user is already in the database
  const userObject = (await redis1.get(`user:${user}`)) as User;
  if (!userObject) {
    // if they aren't, return
    console.log("user not registered");
    return;
  }

  // delete the address book
  await redis1.del(`addressBook:${user}`);
};
