import cv2

# to read as is
# img=cv2.imread("galaxy.jpg", 1)

# Transparancy
# img=cv2.imread("galaxy.jpg", -1)

# Greyscale
img=cv2.imread("galaxy.jpg", 0)
# print(type(img))
# print(img)

# SIZE OF IMAGE shape[0] = Height shape[1] = Width
print(img.shape)

# DIMENSIONS OF IMAGE
print(img.ndim)

resized_image = cv2.resize(img, (int(img.shape[1]/2),int(img.shape[0]/2)))

cv2.imshow("Galaxy",resized_image)
cv2.imwrite("Galaxy_resized.jpg", resized_image)
cv2.waitKey(6000)
cv2.destroyAllWindows()