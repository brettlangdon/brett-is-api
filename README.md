Brett.is API
===========

This is the source code for my publicly hosted API.

The API can be found at `api.brett.is`.

## API

### Time
The time API is to obtain the current date/time as a JSON object.

```bash
$ curl http://api.brett.is/time
{"epoch":1359809111,"month":2,"day":2,"year":2013,"hours":7,"seconds":11,"milliseconds":118,"day_of_week":6,"timezone_offset":-5}

$ curl http://api.brett.is/time/utc
{"epoch":1359809158,"month":2,"day":2,"year":2013,"hours":12,"seconds":58,"milliseconds":266,"day_of_week":6}

$ curl http://api.brett.is/time/epoch
1359809181
```

### BJCP
This API is used to search the current BJCP Style Guide (http://www.bjcp.org/2008styles/catdex.php)

```bash
$ curl http://api.brett.is/bjcp
[{"name":"Lite American Lager","aroma":["Little to no malt aroma, although it can be grainy, sweet or corn-like if present","Hop aroma may range from none to a light, spicy or floral hop presence","Low levels of yeast character (green apples, DMS, or fruitiness) are optional but acceptable","No diacetyl."],"appearance":["Very pale straw to pale yellow color","White, frothy head seldom persists","Very clear."], ...

$ curl http://api.brett.is/bjcp?id=19A
[{"name":"Old Ale","aroma":["Malty-sweet with fruity esters, often with a complex blend of dried-fruit, vinous, caramelly, molasses, nutty, toffee, treacle, and/or other specialty malt aromas","Some alcohol and oxidative notes are acceptable, akin to those found in Sherry or Port","Hop aromas not usually present due to extended aging."],"appearance":["Light amber to very dark reddish-brown color (most are fairly dark)","Age and oxidation may darken the beer further","May be almost opaque (if not, should be clear)","Moderate to low cream- to light tan-colored head; may be adversely affected by alcohol and age."], ...

$ curl http://api.brett.is/bjcp?flavor=malty
[{"name":"Lite American Lager","aroma":["Little to no malt aroma, although it can be grainy, sweet or corn-like if present","Hop aroma may range from none to a light, spicy or floral hop presence","Low levels of yeast character (green apples, DMS, or fruitiness) are optional but acceptable","No diacetyl."],"appearance":["Very pale straw to pale yellow color","White, frothy head seldom persists","Very clear."],"flavor":["Crisp and dry flavor with some low levels of grainy or corn-like sweetness","Hop flavor ranges from none to low levels","Hop bitterness at low level","Balance may vary from slightly malty to slightly bitter, but is relatively close to even","High levels of carbonation may provide a slight acidity or dry \"sting.\"  No diacetyl","No fruitiness."] ...
```

### Units
The units API is used to convert between various measurements.

To get a list of the currently available conversions:
```bash
$ curl http://api.brett.is/units
{"fahrenheit":["celsius"],"celsius":["fahrenheit"],"gallon":["cup","liter","pint","milliliter"],"cup":["gallon","liter","pint","milliliter"],"liter":["gallon","cup","pint","milliliter"],"milliliter":["gallon","cup","pint","liter"],"pint":["gallon","cup","liter","milliliter"],"pound":["ounce","gram"],"ounce":["pound","gram"],"gram":["ounce","pound"]}V
```

To convert between supported measurements:
```bash
$ curl http://api.brett.is/units/5/gallon/to/pint
{"convert":5,"from":"gallon","to":"pint","result":40}
```