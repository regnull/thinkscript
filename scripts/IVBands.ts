# IVBAnads
# 
# Shows bands separated by IV-implied stock movement as of some number of days ago.
#
# Copyright (c) 2020 Leonid Gorkin
# regnull@gmail.com
#
# MIT Licence https://opensource.org/licenses/MIT

input length = 20;
# To get 30% probability, we need to divide sigma by two.
input sigmaFactor = 0.5;

def iv0 = imp_volatility();
def iv = if !IsNaN(iv0) then iv0 else iv0[-1];

def ivPast = iv[length]*Sqrt(length/365)*sigmaFactor;
def upperBand = close[length]*(1 + ivPast);
def lowerBand = close[length]*(1 - ivPast);

plot UpperBandP = upperBand;
plot LowerBandP = lowerBand;
