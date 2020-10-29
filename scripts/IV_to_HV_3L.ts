# IV_to_HV_3L 
# This study computes and shows ratio of Implied Volatility (IV) to Historical Volatility (HV) in three time frames.
#
# Copyright (c) 2020 Leonid Gorkin
# regnulL@gmail.com
#
# MIT Licence https://opensource.org/licenses/MIT

input longLength = 252;
input longColor = {"MAGENTA", "CYAN", "PINK", "LIGHT_GRAY", "ORANGE", "RED", "GREEN", default "GRAY", "WHITE"};
input mediumLength = 60;
input mediumColor = {"MAGENTA", default "CYAN", "PINK", "LIGHT_GRAY", "ORANGE", "RED", "GREEN", "GRAY", "WHITE"};
input shortLength = 20;
input shortColor = {"MAGENTA", "CYAN", "PINK", "LIGHT_GRAY", "ORANGE", "RED", "GREEN", "GRAY", default "WHITE"};

def notDaily = if GetAggregationPeriod() <> AggregationPeriod.DAY then yes else no;

AddLabel(notDaily, "This study works on daily charts only");

def clLog = log(close / close[1]);

def hvLong = stdev(clLog, longLength) * Sqrt(252);
def hvMedium = stdev(clLog, mediumLength) * Sqrt(252);
def hvShort = stdev(clLog, shortLength) * Sqrt(252);
def iv0 = imp_volatility();
def iv = if !IsNaN(iv0) then iv0 else iv0[-1];

def longRatio = iv/hvLong;
def mediumRatio = iv/hvMedium;
def shortRatio = iv/hvShort;

plot IV_to_HV_long = longRatio;
IV_to_HV_long.SetDefaultColor(GetColor(longColor));
plot IV_to_HV_medium = mediumRatio;
IV_to_HV_medium.SetDefaultColor(GetColor(mediumColor));
plot IV_to_HV_Short = shortRatio;
IV_to_HV_medium.SetDefaultColor(GetColor(shortColor));

plot IV_eq_HV = 1.0;
IV_eq_HV.SetDefaultColor(Color.RED);
plot High_IV = 2.0;
High_IV.SetDefaultColor(Color.GREEN);

AddLabel(yes, Concat("IV: ", AsText(iv, NumberFormat.TWO_DECIMAL_PLACES)), Color.GRAY);
AddLabel(yes, Concat(longLength, Concat("d IV/HV ", AsText(longRatio, NumberFormat.TWO_DECIMAL_PLACES))), if longRatio < 1.0 then Color.RED else if longRatio > 2.0 then Color.GREEN else Color.YELLOW);
AddLabel(yes, Concat(mediumLength, Concat("d IV/HV ", AsText(mediumRatio, NumberFormat.TWO_DECIMAL_PLACES))), if mediumRatio < 1.0 then Color.RED else if mediumRatio > 2.0 then Color.GREEN else Color.YELLOW);
AddLabel(yes, Concat(shortLength, Concat("d IV/HV ", AsText(shortRatio, NumberFormat.TWO_DECIMAL_PLACES))), if shortRatio < 1.0 then Color.RED else if shortRatio > 2.0 then Color.GREEN else Color.YELLOW);
