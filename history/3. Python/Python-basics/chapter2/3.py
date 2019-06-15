sentence = raw_input("Please input a sentence:")
sentence_len = len(sentence)

screen_width = 80
text_width = sentence_len + 4
margin_left = (screen_width - text_width) // 2

print ' ' * margin_left + '+' + '-' * (text_width - 2) + '+'
print ' ' * margin_left + '| '  + ' ' * sentence_len + ' |'
print ' ' * margin_left + '| '  + sentence + ' | '
print ' ' * margin_left + '| '  + ' ' * sentence_len + ' |'
print ' ' * margin_left + '+' + '-' * (text_width - 2) + '+'
