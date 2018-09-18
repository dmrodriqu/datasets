#!python3
#Dylan Rodriquez

#Project 1

'''
Four visualizations are created from this program. No arguments are required.
The dataset is hosted online and requests is used in conjunction with io to read
into pandas.

required dependencies: altair



'''
import pandas as pd
import io
import altair as alt
from altair.expr import datum, if_
import requests


#get data from url
url = "https://raw.githubusercontent.com/dmrodriqu/datasets/master/old_cars.csv"
def readFromUrl(url):
    rq = requests.get(url).content
    data = pd.read_csv(io.StringIO(rq.decode('utf-8')))
    return data

# set to a variable, only read once
df = readFromUrl(url)
# call this function for specific modifications on main dataframe
def dataprocess(data, cas):
    if (cas == 1):
        origins = data.melt(id_vars = 'Origin', value_vars = ['MPG','Displacement','Horsepower','Weight','Model'], value_name = 'values')
        MPGbyOrigin = origins[origins['variable'] == 'MPG']
        return MPGbyOrigin
    elif(cas == 2):
        modav = data.groupby(['Model', 'Origin'])['MPG'].mean().unstack().reset_index()
        modmelt = modav.melt(id_vars = 'Model', value_vars = ['Europe','Japan','US'], value_name="MPG")
        return modmelt
    else:
        return data

# task 1: histogram
def task1(data, cas):
    data = dataprocess(data, cas)
    task1chart = alt.Chart(data, title='MPG By Country').mark_area(
        opacity=0.2,
        interpolate='step'
    ).encode(
        alt.X('values', bin=alt.Bin(maxbins = data['values'].values.max()), title = 'MPG'),
        alt.Y('count()', stack = None, title='Frequency'),
        alt.Color(
            'Origin',
            scale = alt.Scale(range=['#0000ff', '#008000', '#ff0000'])
        )
    ).properties(
    width = 1024,
    height = 768
)

    task1chart.save('task1.html')

# task 2, line chart
def task2(data, cas):
    data = dataprocess(data, cas)
    t2= alt.Chart(data, title="MPG Has Increased Over Time").mark_line().encode(
        x = 'Model',
        y = 'MPG',
        color = 'Origin'
    ).properties(
    width = 1024,
    height = 768
)

    t2.save('task2.html')

# task 3, scatter plot with redundant scaling
def task3(data, cas):
    data = dataprocess(data, cas)
    t3 = alt.Chart(data, title="MPG decreases as Horsepower Increases").mark_point().encode(
        alt.X('Horsepower', scale=alt.Scale(zero=False)),
        alt.Y('MPG',  scale=alt.Scale(zero = False)),
        color='Origin',
        size = 'Horsepower'
    ).properties(
        width = 1024,
        height = 768
    ).interactive()


    t3.save('task3.html')

# task 4, scatterplot matrix
def task4(data, cas):
    data = dataprocess(data, cas)
    t4 = alt.Chart(data, title = "Comparison of MPG, Weight, Horsepower, and Displacement").mark_circle().encode(
        alt.X(alt.repeat("column"), type='quantitative'),
        alt.Y(alt.repeat("row"), type='quantitative'),
        color="Origin:N"
    ).properties(
        height = 340,
        width = 340
    ).repeat(
        row = ['MPG', 'Weight', 'Horsepower', 'Displacement'],
        column =['MPG', 'Weight', 'Horsepower', 'Displacement']
    )
    t4.save('task4.html')

# dictionary to define which task, switch on how to modify data
tasks = {1 : task1,
         2 : task2,
         3 : task3,
         4 : task4}

def main():
    # pass in key from dictionary so we know how to modify data
    for k,v in tasks.items():
        # v  is task, takes df as argument with modification arg
        v(df, k)

# call to run
main()
