export type TicketType = {
  id?: number;
  category: string;
  topic: string;
  description: string;
  status: string;
  chat?: ChatObjectType;
};

export type ChatObjectType = {
  chat: number;
  has_perm_to_read: boolean;
  has_perm_to_write: boolean;
};
