# IVPercentile
# This study shows the current IV percentile, 0 to 100.
#
# Copyright (c) 2020 Leonid Gorkin
# regnull@gmail.com
#
# MIT Licence https://opensource.org/licenses/MIT
declare lower;
declare hide_on_intraday;

input length = 252;

def notDaily = if GetAggregationPeriod() <> AggregationPeriod.DAY then yes else no;
AddLabel(notDaily, "This study works on daily charts only");

def iv0 = imp_volatility();
def iv = if !IsNaN(iv0) then iv0 else iv0[-1];

def min = Lowest(iv, length);
def max = Highest(iv, length);

def pct = (iv - min)/(max - min);

plot IVPercentile = pct * 100;