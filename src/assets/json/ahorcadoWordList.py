import pandas
import json

excel_data_df = pandas.read_excel('ahorcadoWordList.xlsx', sheet_name='words')

json_read = excel_data_df.to_json(orient='records')

thisisjson_dict = json.loads(json_read)

with open('ahorcadoWordList.json', 'w') as json_file:
    json.dump(thisisjson_dict, json_file, indent=4)

