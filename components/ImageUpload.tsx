import { useState } from "react";
import { API_URL } from "@/config/index";
import styles from "../src/styles/Form.module.css";
import axios from "axios";

export default function ImageUpload({ sportNewsId, imageUploaded}: any) {
  const [image, setImage] = useState<string|Blob>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", image);
    console.log(image);
    try{
      const response = await axios.post(`${API_URL}/api/upload`, formData).then((response)=>{

        const imageUrl = response.data[0].url;
  
        axios.put(`${API_URL}/api/sports/${sportNewsId}`, {
            data: {
                image: imageUrl
            }
        })
      });

      imageUploaded();
    }
    catch(error){
        console.log(error);
    }
  };

  const handleFileChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.form}>
      <h4>Upload Sport News Image</h4>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  );
}
