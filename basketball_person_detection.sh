export DISPLAY=192.168.86.245:0.0
export BBALL=/shared_data/hsbball_trim.mp4
export P_DETECTION=/root/intel/dl_streamer/models/intel/person-vehicle-bike-detection-crossroad-0078/FP16-INT8/person-vehicle-bike-detection-crossroad-0078.xml
export P_PROC=/opt/intel/openvino_2021.3.394/data_processing/dl_streamer/samples/model_proc//person-vehicle-bike-detection-crossroad-0078.json

gst-launch-1.0 \
filesrc location=${BBALL} ! decodebin ! \
gvadetect model=${P_DETECTION} model_proc=${P_PROC} device=CPU inference-interval=10 ! queue ! \
gvatrack tracking-type=short-term ! queue ! \
gvawatermark ! videoconvert ! fpsdisplaysink  sync=false