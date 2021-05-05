import { TransactionCategoryEnum } from "../types";

export function translateCategory(category: TransactionCategoryEnum) {
  switch (category) {
    case TransactionCategoryEnum.FOOD:
      return "Comida";
    case TransactionCategoryEnum.ENTERTAINMENT:
      return "Entretenimiento";
    case TransactionCategoryEnum.MISC:
      return "Misceláneo";
    case TransactionCategoryEnum.SUBSCRIPTION:
      return "Subscripción";
    case TransactionCategoryEnum.WORK:
      return "Trabajo";
  }
}
