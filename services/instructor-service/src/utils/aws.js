const generateFileUrl = (fileName) => {
    return `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${fileName}`;
}

export {
    generateFileUrl,
};