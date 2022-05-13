export default function handler(req, res) {
    const tokenId = req.query.tokenId;
   const image_url =
      "https://gateway.pinata.cloud/ipfs/QmcfsZCGdcXyHJP8MupMQwYuSET8TFJCHUhAaoJwe4EJuP/";
    res.status(200).json({
      name: "Web3ladies Certificate #" + tokenId,
      description: "Web3ladies Certificate is given to graduants of the Web3ladies Mentorship Program",
      image: image_url + tokenId + ".svg",
    });
  }