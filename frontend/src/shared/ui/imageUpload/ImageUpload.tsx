import styles from './ImageUpload.module.scss';
import {useEffect} from "react";

interface ImageUploadProps {
    image?: File | null
    onChange?: (file: File | null) => void;
}

export const ImageUpload = ({ onChange, image }: ImageUploadProps) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onChange?.(file);
    };

    return (
        <div className={styles.wrapper}>
            <label className={styles.uploadButton}>
                Загрузить изображение
                <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                />
            </label>

            <div className={styles.preview}>
                {image ? (
                    <img
                        src={`${process.env.REACT_APP_API_URL}${image}`}
                        alt="preview"
                        className={styles.previewImage}
                    />
                ) : (
                    <span className={styles.placeholder}></span>
                )}
            </div>
        </div>
    );
};
