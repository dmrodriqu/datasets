import networkx as nx
import json
import pandas as pd
from networkx.readwrite import json_graph
from pandas.io.json import json_normalize
import sys



# conversion from .net to json for use with D3

def pajcon(infile):
    print("Reading pajek file")
    G = nx.read_pajek(infile)
    central = nx.degree_centrality(G)
    data = json_graph.node_link_data(G)
    f = open("data.json", "w")
    print("Writing json file")
    f.write(json.dumps(data))
    f.close()
    print("Done")
    return data, central


'''
nodes  = json_normalize(data, "nodes")
links = json_normalize(data, "links")
print(links.head())
unpivotlink = links.pivot(index = 'source', columns="target",values="weight")
ax = pd.concat([nodes, unpivotlink], axis=  1)
print(ax)
'''
