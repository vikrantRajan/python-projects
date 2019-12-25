import folium
import pandas

data = pandas.read_csv("Volcanoes.txt")
latitude = list(data["LAT"])
longitude = list(data["LON"])
name = list(data["NAME"])
elevation = list(data["ELEV"])

def volcano_height(x):
    if x < 1000:
        return "green"
    elif x > 1000 and x < 3000:
        return "orange"
    else: 
        return "red"

map = folium.Map(location=[38.58, -99.09], zoom_start=6, tiles="Stamen Terrain")

fgv = folium.FeatureGroup(name="Volcanoes")

for lat, lon, el, n in zip(latitude, longitude, elevation, name):
    fgv.add_child(folium.CircleMarker(location=[lat, lon], radius= 6, popup=str(n) + "\n" + str(el)+"m", fill_color=volcano_height(el), color = 'grey', fill_opacity=0.7))

fgp = folium.FeatureGroup(name="Population")

fgp.add_child(folium.GeoJson(data=open("world.json", 'r', encoding='utf-8-sig').read(), 
style_function=lambda x: {'fillColor': 'green' if x['properties']['POP2005'] < 10000000 
else 'orange' if 10000000 <= x['properties']['POP2005'] < 20000000  else 'red'}))


map.add_child(fgv)
map.add_child(fgp)
map.add_child(folium.LayerControl())
map.save("Map1.html")
