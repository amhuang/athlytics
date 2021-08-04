import tkinter as tk

window = tk.Tk()
header= tk.Label(text="Athlytics Video Tagger")

menu_frame = tk.Frame(
    master=window)
video_frame = tk.Frame(
    master=window,
    width=800,
    height=400,
    bg="black"
)
video_progress = tk.Frame(
    master=window,
    width=1000,
    height=100
)

button = tk.Button(
    master=menu_frame,
    text="Choose a video",
    width=15,
    height=3,
    bg="black",
    fg="black",
)

header.pack()
menu_frame.pack(side=tk.LEFT)
button.pack()
video_frame.pack(side=tk.RIGHT)
video_progress.pack(side=tk.BOTTOM)

window.mainloop()