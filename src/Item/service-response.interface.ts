export interface ServiceResponse {
    success: boolean;
    message: string;
    [key: string]: any;  // هذا يسمح بإضافة خصائص إضافية إذا كنت بحاجة إليها
  }
  