import pandas as pd
import json
import math
from dataconversion import pajcon
from pandas.io.json import json_normalize
import jellyfish

def matchPort(x, airportNames):
    matchedPort = None
    maxScore = 0
    for airport in airportNames:
        jwScore = jellyfish.jaro_winkler(x, airport)
        if(jwScore > maxScore):
            maxScore = jwScore
            matchedPort = airport
    return matchedPort

def findMatch(x, airportNames):
    if(len(airportNames)== 0):
        return None
    else:
        mid = len(airportNames)//2
        right = matchPort(x, airportNames[mid+1:])
        left = matchPort(x, airportNames[:mid])
        return matchPort(x,[right,left])

def normalizeFrame(frame, by, reset = True):
    if(reset):
        return json_normalize(frame, by).reset_index()
    else:
        return json_normalize(frame, by)


def getlinkdefs(links):
    linkdicslist = []
    for source in links:
        connections = []
        s = {}
        i = 0
        edgecount = 0
        for target in links[source]:
            if(not math.isnan(target)):
                d = {}
                d["source"] = source
                d["target"] = i
                d["weight"] = target
                edgecount +=1
                connections.append(d)
            i +=1
        s['pairwise'] = connections
        for k in range(len(connections)):
            connections[k]['connections'] = edgecount
        linkdicslist.append(connections)
    return linkdicslist



def processDatabase(database, airportFile):
    airdb  = pd.read_table(database, delimiter = ',', header = None).drop(columns = [0])
    usair97, centraldata = pajcon(airportFile)
    centraldf = json_normalize(centraldata)
    centraldf = centraldf.transpose().reset_index()
    centraldf['centrality'], centraldf['id']= centraldf[0], centraldf['index']
    centraldf = centraldf.drop(columns=['index',0])
    usair97, usair97links  = normalizeFrame(usair97,'nodes'), normalizeFrame(usair97, 'links', reset = False)
    unpivotlink = usair97links.pivot(index = 'source', columns = 'target', values = 'weight')
    usair97['ids']= usair97['id'].map(lambda x: findMatch(x, airdb[1]))
    usair97 = usair97.merge(centraldf)
    usair97 = usair97.drop(columns =['id'])
    out = usair97.merge(airdb, left_on = 'ids', right_on = 1).drop(columns = [11])
    out['id'] = out['index']
    out = out.drop(columns =['index'])
    linkdicslist  = getlinkdefs(unpivotlink)
    linkdicslist = [item for sublist in linkdicslist for item in sublist]
    return out, linkdicslist

def main():
    datfile = 'airports.dat'
    airFile = 'USAir97.net'
    coordinates, links= processDatabase(datfile, airFile)
    st = json.dumps(links)
    sourceTargetFile  = open('sourcetarget.json','w')
    sourceTargetFile.write(st)
    sourceTargetFile.close()
    coordinates.to_json('coordinates2.json', orient = 'split')
main()

