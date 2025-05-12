import { configDotenv } from 'dotenv';
configDotenv();

export const upload = async (file: any) => {
  const apiToken = process.env.API_TOKEN_IMG;
  const accountId = process.env.ACCOUNT_ID_IMG;
  const formData = new FormData();
  formData.append('file', file.buffer, file.originalname);
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
      body: formData,
    },
  ).then((r) => r.json());
  return res.result.variants[0];
};
