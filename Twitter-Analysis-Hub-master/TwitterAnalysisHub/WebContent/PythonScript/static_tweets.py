#Fetching Tweets... Last 100
#HDFS is unused due to less amount of tweets. Can be used when a lot of tweets are fetched for analysis
#Just remove the comments from the lines below

import tweepy
import time
import json
import sys
import string
from pyspark import SparkContext,SparkConf
from datetime import date,timedelta
from tweepy import OAuthHandler
from textblob import TextBlob

sc=SparkContext(conf=SparkConf().setAppName('Loading Tweets'))

#Please change with your own consumer key, consumer secret, access token and access secret
consumer_key = 'PglM3T2NoBzq0ktWTUBelJTHg'
consumer_secret = 'aDKWrqZQAwje0fJBBVufrxJWE5KY3T8cSlUUGuRyvuvYznGQOC'
access_token = '624310916-N9aUtUrr1BjnNhOPV6vPz0Aty1OZ1utIyF3hm4Cm'
access_secret = 'VyJCNbvceb6RpPXRLVo8e2sysJXwQ59AEc9KAQfQfNRoO'
 
auth = OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_secret)
args = sys.argv;
api = tweepy.API(auth,timeout=10)

filename='tweets'+str(time.time())+'.pickle'
folderurl='/user/bijoyan/tweetstore/'

list_tweets = []

for status in tweepy.Cursor(api.search,q=args[1:],lang='en',result_type='recent').items(100):
    list_tweets.append(status.text)

mainRdd = sc.parallelize(list_tweets)
#mainRdd.saveAsPickleFile(folderurl+filename)
def mymap(line):
	for char in string.punctuation:
		line = line.replace(char,' ')
	blob = TextBlob(line)
	sum=0
	n=0
	for sentence in blob.sentences:
		sum+=sentence.sentiment.polarity
		n+=1
	return (sum/n)*100
#mainRdd=sc.pickleFile(folderurl+filename)
mainRdd = mainRdd.map(mymap)
for emotion in mainRdd.collect():
	print(emotion)

