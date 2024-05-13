import { API_URL } from "@/config/index";

export function converToImageUrl(urlResponse: string){
    return `${API_URL}${urlResponse}`;
}

export function generateUniqueKey() {
    const timestamp = new Date().getTime();

    const randomNumber = Math.floor(Math.random() * 1000000);

    const uniqueKey = timestamp.toString() + randomNumber.toString();

    return uniqueKey;
  }