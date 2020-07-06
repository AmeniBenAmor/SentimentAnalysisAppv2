from googletrans import Translator

def translate_text(text):
    translator = Translator()
    return translator.translate(text, src=translator.detect(text).lang).text

   
def translate_file( filename ):
    f = open(filename , "r")
    file_text=f.readlines()
    text_translated= list(map(lambda x: translate_text(x), file_text))
    return text_translated  

def language_detected(text):
    translator = Translator()
    return translator.detect(text).lang 