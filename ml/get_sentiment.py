from huggingface_hub import hf_hub_download

repo_name = 'theocosmin/sentiment'

save_directory = './ml_models/sentiment'

hf_hub_download(repo_name, filename='sa_model.h5', local_dir=save_directory)
hf_hub_download(repo_name, filename="tokenizer.json", local_dir=save_directory)


