import { NextApiRequest, NextApiResponse } from 'next';
import '../../lib/twitch/bot';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(JSON.stringify(globalThis.messages));
}
