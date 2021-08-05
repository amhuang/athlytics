
INPUT=practice.mp4
MODEL1=person-detection-retail-0013


# MODEL_PATH=intel/person-detection-retail-0013/FP32/person-detection-retail-0013.xml
MODEL_PATH=intel/person-vehicle-bike-detection-crossroad-0078/FP32/person-vehicle-bike-detection-crossroad-0078.xml
MODEL_PROC=model_proc/person-vehicle-bike-detection-crossroad-0078.json

# MODEL_1=person-vehicle-bike-detection-crossroad-0078/FP16-INT8/person-vehicle-bike-detection-crossroad-0078

gst-launch-1.0 \
filesrc location=${INPUT} !  \
gvadetect model=${MODEL_PATH} odel_proc=${MODEL_PROC} device=CPU inference-interval=10 ! queue ! \
gvatrack tracking-type=short-term ! queue ! \
gvawatermark ! videoconvert ! fpsdisplaysink  sync=false