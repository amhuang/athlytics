#  Interactive Player Classification Demo

This demo showcases a classification task for player recognition using a sequence of neural networks. A set of pre-trained models from Intel Open Model Zoo are used in this demo:

- `face-detection-adas-0001` is primary detection network for finding faces
- `person-detection-retail-0002` is the primary detection network for finding persons
- `person-reidentification-retail-0079` is executed on top of the person detection model to conclude whether a person has already been detected or not

person-vehicle-bike-detection-crossroad-0078
person-detection-retail-0013
person-reidentification-retail-0277

Athlytics uses Intel OpenVINO™’s person and face detection capabilities to identify individuals in an uploaded video. It uses the pre-trained model person-detection-retail-0002 to draw bounding boxes to detect players in a frame from the input video sequence. We use the gvatrack element from DLStreamer in order to reduce the number of frames that inference on the person detection model must be run on, improving the performance of the application. Inference on the detection model is only run every 10 frames, while the gva tracker tracks players on all other frames until the model is run again. This leads to a tradeoff between accuracy and performance necessary process lengthy practice videos. The person-reidentification-retail-0079 is executed on top of the results from the person detection model to identify if a specific player has already been detected or not. If a person was already detected from an earlier frame, the model tags the person in the current frame with the same ID. These networks then produce metadata identifying individual players and which frames they appear in. Athlytics visualizes this data on an interactive progress bar for each player, allowing coaches and players to easily and quickly navigate to view individual performances.