from transformers import PegasusTokenizer, TFPegasusForConditionalGeneration

model_name = 'google/pegasus-xsum'

tokenizer = PegasusTokenizer.from_pretrained(model_name)
model = TFPegasusForConditionalGeneration.from_pretrained(model_name)


save_directory = './ml_models/summary'

tokenizer.save_pretrained(save_directory)
model.save_pretrained(save_directory)