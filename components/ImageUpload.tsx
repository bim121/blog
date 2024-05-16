import { useState } from "react";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";

export default function ImageUpload({ sportNewsId, imageUploaded, token }: any) {
  const [image, setImage] = useState<string|Blob>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "sports");
    formData.append("refId", sportNewsId);
    formData.append("field", "image");

    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      imageUploaded();
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
