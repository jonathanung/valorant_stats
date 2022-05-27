import requests
import json


def getAgentsAPI():

  #parameters for the API request
  parameters = {
    'language': 'en-US',
    'isPlayableCharacter': 'true'
  }

  #API request
  response = requests.get('https://valorant-api.com/v1/agents', parameters)

  #cloning the created json file from the API
  with open('agents.json', 'w') as file_out:
      json.dump(response.json(), file_out, indent=2)

  print(response.status_code)
  # print(current)

def getRanksAPI():

  #parameters for the API request
  parameters = {
    'language': 'en-US',
  }

  #API request
  response = requests.get('https://valorant-api.com/v1/competitivetiers', parameters)

  #cloning the created json file from the API
  with open('ranks.json', 'w') as file_out:
      json.dump(response.json(), file_out, indent=2)

  print(response.status_code)
  # print(current)

def getMapsAPI():

  #parameters for the API request
  parameters = {
    'language': 'en-US',
  }

  #API request
  response = requests.get('https://valorant-api.com/v1/maps', parameters)

  #cloning the created json file from the API
  with open('maps.json', 'w') as file_out:
      json.dump(response.json(), file_out, indent=2)

  print(response.status_code)
  # print(current)



def getAllAPI():

  getAgentsAPI()
  getRanksAPI()
  getMapsAPI()

getAgentsAPI()