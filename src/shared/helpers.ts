import { API_URL } from "@/config/index";

export default function converToImageUrl(urlResponse: string){
    return `${API_URL}${urlResponse}`;
}