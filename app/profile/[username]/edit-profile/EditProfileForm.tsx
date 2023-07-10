'use client';
// import axios from 'axios';
// import cloudinary from 'cloudinary';
// import { useRouter } from 'next/navigation';
import { useState } from 'react';

// import { ImageResponseBodyPost } from '../../../api/images/route';

export default function EditProfileForm() {
  /* const [profilePicture, setProfilePicture] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

   async function uploadImage() {
    const response = await fetch('/api/images', {
      method: 'POST',
      body: JSON.stringify({
        url,
      }),
    });

    const data: ImageResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
      return;
    }
  }

  async function handleUploadImage(event: any) {}

  console.log('image url', url); */
  /* const [imageSrc, setImageSrc] = useState<string | undefined>();
  const [uploadData, setUploadData] = useState();

  function handleOnChange(changeEvent: any) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      if (onLoadEvent.target && onLoadEvent.target.result) {
        setImageSrc(onLoadEvent.target.result.toString());
        setUploadData(undefined);
      }
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event: any) {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      (element) =>
        element instanceof HTMLInputElement && element.name === 'file',
    ) as HTMLInputElement | undefined;
    console.log('event', fileInput);

    const formData = new FormData();

    if (fileInput && fileInput.files !== null) {
      for (const file of fileInput.files) {
        formData.append('file', file);
      }
    }

    formData.append('upload_preset', 'profile_pictures');

    const data = await fetch(
      'https://api.cloudinary.com/v1_1/ds6wzbd0c/image/upload',
      {
        method: 'POST',
        body: formData,
      },
    ).then((r) => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
  }

  return (
    <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
      <img
        src={imageSrc}
        alt="profile pic"
        style={{ width: '200px', height: 'auto' }}
      />
      <p>
        <input type="file" name="file" />
      </p>

      <button>Upload Files</button>

      {imageSrc !== undefined && !uploadData && (
        <p>
          <button>Upload Files</button>
        </p>
      )}

      {uploadData && (
        <code>
          <pre>{JSON.stringify(uploadData, null, 2)}</pre>
        </code>
      )}
    </form>
  ); */

  const [imageSrc, setImageSrc] = useState<string | undefined>();

  function handleOnChange(changeEvent: any) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      if (onLoadEvent.target && onLoadEvent.target.result) {
        setImageSrc(onLoadEvent.target.result.toString());
      }
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event: any) {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      (element) =>
        element instanceof HTMLInputElement && element.name === 'file',
    ) as HTMLInputElement | undefined;

    console.log('File Input', fileInput);

    const formData = new FormData();

    if (fileInput && fileInput.files !== null) {
      for (const file of fileInput.files) {
        formData.append('file', file);
      }
    }

    formData.append('upload_preset', 'profile_pictures');

    const data = await fetch(
      'https://api.cloudinary.com/v1_1/ds6wzbd0c/image/upload',
      {
        method: 'POST',
        body: formData,
      },
    ).then((r) => r.json());

    setImageSrc(data.secure_url);
  }

  const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
  const cloudinaryUrl =
    'https://res.cloudinary.com/ds6wzbd0c/image/upload/v1234567890/public_id.jpg';

  const getPublicIdFromUrl = (url: any) => {
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const publicId = getPublicIdFromUrl(cloudinaryUrl);
  console.log('public id', publicId);

  return (
    <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
      <img
        src={imageSrc}
        alt="profile pic"
        style={{ width: '200px', height: 'auto' }}
      />
      <p>
        <input type="file" name="file" />
      </p>

      <button>Upload Files</button>
    </form>
  );
}
