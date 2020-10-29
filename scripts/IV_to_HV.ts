# IV_to_HV
# This study computes the ratio of Implied Volatility (IV) to Historical Volatility (HV) for the given length of time.
#
# Copyright (c) 2020 Leonid Gorkin
# regnull@gmail.com
#
# MIT Licence https://opensource.org/licenses/MIT
declare lower;
declare hide_on_intraday;

input length = 60;

def notDaily = if GetAggregationPeriod() <> AggregationPeriod.DAY then yes else no;
AddLabel(notDaily, "This study works on daily charts only");

def clLog = log(close / close[1]);

def hv = stdev(clLog, length) * Sqrt(252);
def iv0 = imp_volatility();
def iv = if !IsNaN(iv0) then iv0 else iv0[-1];

def r = iv/hv;

plot IV_to_HV = r;